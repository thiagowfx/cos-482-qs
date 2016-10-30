package br.ufrj.cos482.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.ufrj.cos482.service.AlunoMestradoService;
import br.ufrj.cos482.web.rest.util.HeaderUtil;
import br.ufrj.cos482.service.dto.AlunoMestradoDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing AlunoMestrado.
 */
@RestController
@RequestMapping("/api")
public class AlunoMestradoResource {

    private final Logger log = LoggerFactory.getLogger(AlunoMestradoResource.class);
        
    @Inject
    private AlunoMestradoService alunoMestradoService;

    /**
     * POST  /aluno-mestrados : Create a new alunoMestrado.
     *
     * @param alunoMestradoDTO the alunoMestradoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new alunoMestradoDTO, or with status 400 (Bad Request) if the alunoMestrado has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/aluno-mestrados",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<AlunoMestradoDTO> createAlunoMestrado(@RequestBody AlunoMestradoDTO alunoMestradoDTO) throws URISyntaxException {
        log.debug("REST request to save AlunoMestrado : {}", alunoMestradoDTO);
        if (alunoMestradoDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("alunoMestrado", "idexists", "A new alunoMestrado cannot already have an ID")).body(null);
        }
        AlunoMestradoDTO result = alunoMestradoService.save(alunoMestradoDTO);
        return ResponseEntity.created(new URI("/api/aluno-mestrados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("alunoMestrado", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /aluno-mestrados : Updates an existing alunoMestrado.
     *
     * @param alunoMestradoDTO the alunoMestradoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated alunoMestradoDTO,
     * or with status 400 (Bad Request) if the alunoMestradoDTO is not valid,
     * or with status 500 (Internal Server Error) if the alunoMestradoDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/aluno-mestrados",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<AlunoMestradoDTO> updateAlunoMestrado(@RequestBody AlunoMestradoDTO alunoMestradoDTO) throws URISyntaxException {
        log.debug("REST request to update AlunoMestrado : {}", alunoMestradoDTO);
        if (alunoMestradoDTO.getId() == null) {
            return createAlunoMestrado(alunoMestradoDTO);
        }
        AlunoMestradoDTO result = alunoMestradoService.save(alunoMestradoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("alunoMestrado", alunoMestradoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /aluno-mestrados : get all the alunoMestrados.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of alunoMestrados in body
     */
    @RequestMapping(value = "/aluno-mestrados",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<AlunoMestradoDTO> getAllAlunoMestrados() {
        log.debug("REST request to get all AlunoMestrados");
        return alunoMestradoService.findAll();
    }

    /**
     * GET  /aluno-mestrados/:id : get the "id" alunoMestrado.
     *
     * @param id the id of the alunoMestradoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the alunoMestradoDTO, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/aluno-mestrados/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<AlunoMestradoDTO> getAlunoMestrado(@PathVariable Long id) {
        log.debug("REST request to get AlunoMestrado : {}", id);
        AlunoMestradoDTO alunoMestradoDTO = alunoMestradoService.findOne(id);
        return Optional.ofNullable(alunoMestradoDTO)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /aluno-mestrados/:id : delete the "id" alunoMestrado.
     *
     * @param id the id of the alunoMestradoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/aluno-mestrados/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteAlunoMestrado(@PathVariable Long id) {
        log.debug("REST request to delete AlunoMestrado : {}", id);
        alunoMestradoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("alunoMestrado", id.toString())).build();
    }

}
