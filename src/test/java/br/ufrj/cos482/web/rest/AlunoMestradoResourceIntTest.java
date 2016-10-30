package br.ufrj.cos482.web.rest;

import br.ufrj.cos482.Cos482App;

import br.ufrj.cos482.domain.AlunoMestrado;
import br.ufrj.cos482.repository.AlunoMestradoRepository;
import br.ufrj.cos482.service.AlunoMestradoService;
import br.ufrj.cos482.service.dto.AlunoMestradoDTO;
import br.ufrj.cos482.service.mapper.AlunoMestradoMapper;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AlunoMestradoResource REST controller.
 *
 * @see AlunoMestradoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Cos482App.class)
public class AlunoMestradoResourceIntTest {


    @Inject
    private AlunoMestradoRepository alunoMestradoRepository;

    @Inject
    private AlunoMestradoMapper alunoMestradoMapper;

    @Inject
    private AlunoMestradoService alunoMestradoService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restAlunoMestradoMockMvc;

    private AlunoMestrado alunoMestrado;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        AlunoMestradoResource alunoMestradoResource = new AlunoMestradoResource();
        ReflectionTestUtils.setField(alunoMestradoResource, "alunoMestradoService", alunoMestradoService);
        this.restAlunoMestradoMockMvc = MockMvcBuilders.standaloneSetup(alunoMestradoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AlunoMestrado createEntity(EntityManager em) {
        AlunoMestrado alunoMestrado = new AlunoMestrado();
        return alunoMestrado;
    }

    @Before
    public void initTest() {
        alunoMestrado = createEntity(em);
    }

    @Test
    @Transactional
    public void createAlunoMestrado() throws Exception {
        int databaseSizeBeforeCreate = alunoMestradoRepository.findAll().size();

        // Create the AlunoMestrado
        AlunoMestradoDTO alunoMestradoDTO = alunoMestradoMapper.alunoMestradoToAlunoMestradoDTO(alunoMestrado);

        restAlunoMestradoMockMvc.perform(post("/api/aluno-mestrados")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(alunoMestradoDTO)))
                .andExpect(status().isCreated());

        // Validate the AlunoMestrado in the database
        List<AlunoMestrado> alunoMestrados = alunoMestradoRepository.findAll();
        assertThat(alunoMestrados).hasSize(databaseSizeBeforeCreate + 1);
        AlunoMestrado testAlunoMestrado = alunoMestrados.get(alunoMestrados.size() - 1);
    }

    @Test
    @Transactional
    public void getAllAlunoMestrados() throws Exception {
        // Initialize the database
        alunoMestradoRepository.saveAndFlush(alunoMestrado);

        // Get all the alunoMestrados
        restAlunoMestradoMockMvc.perform(get("/api/aluno-mestrados?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(alunoMestrado.getId().intValue())));
    }

    @Test
    @Transactional
    public void getAlunoMestrado() throws Exception {
        // Initialize the database
        alunoMestradoRepository.saveAndFlush(alunoMestrado);

        // Get the alunoMestrado
        restAlunoMestradoMockMvc.perform(get("/api/aluno-mestrados/{id}", alunoMestrado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(alunoMestrado.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAlunoMestrado() throws Exception {
        // Get the alunoMestrado
        restAlunoMestradoMockMvc.perform(get("/api/aluno-mestrados/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAlunoMestrado() throws Exception {
        // Initialize the database
        alunoMestradoRepository.saveAndFlush(alunoMestrado);
        int databaseSizeBeforeUpdate = alunoMestradoRepository.findAll().size();

        // Update the alunoMestrado
        AlunoMestrado updatedAlunoMestrado = alunoMestradoRepository.findOne(alunoMestrado.getId());
        AlunoMestradoDTO alunoMestradoDTO = alunoMestradoMapper.alunoMestradoToAlunoMestradoDTO(updatedAlunoMestrado);

        restAlunoMestradoMockMvc.perform(put("/api/aluno-mestrados")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(alunoMestradoDTO)))
                .andExpect(status().isOk());

        // Validate the AlunoMestrado in the database
        List<AlunoMestrado> alunoMestrados = alunoMestradoRepository.findAll();
        assertThat(alunoMestrados).hasSize(databaseSizeBeforeUpdate);
        AlunoMestrado testAlunoMestrado = alunoMestrados.get(alunoMestrados.size() - 1);
    }

    @Test
    @Transactional
    public void deleteAlunoMestrado() throws Exception {
        // Initialize the database
        alunoMestradoRepository.saveAndFlush(alunoMestrado);
        int databaseSizeBeforeDelete = alunoMestradoRepository.findAll().size();

        // Get the alunoMestrado
        restAlunoMestradoMockMvc.perform(delete("/api/aluno-mestrados/{id}", alunoMestrado.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<AlunoMestrado> alunoMestrados = alunoMestradoRepository.findAll();
        assertThat(alunoMestrados).hasSize(databaseSizeBeforeDelete - 1);
    }
}
