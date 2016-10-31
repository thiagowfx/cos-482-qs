package br.ufrj.cos482.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.ufrj.cos482.service.AlunoDoutoradoService;
import br.ufrj.cos482.web.rest.util.HeaderUtil;
import br.ufrj.cos482.service.dto.AlunoDoutoradoDTO;
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
 * REST controller for managing AlunoDoutorado.
 */
@RestController
@RequestMapping("/api")
public class AlunoDoutoradoResource {

    private final Logger log = LoggerFactory.getLogger(AlunoDoutoradoResource.class);
        
    @Inject
    private AlunoDoutoradoService alunoDoutoradoService;

    /**
     * POST  /aluno-doutorados : Create a new alunoDoutorado.
     *
     * @param alunoDoutoradoDTO the alunoDoutoradoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new alunoDoutoradoDTO, or with status 400 (Bad Request) if the alunoDoutorado has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/aluno-doutorados",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<AlunoDoutoradoDTO> createAlunoDoutorado(@RequestBody AlunoDoutoradoDTO alunoDoutoradoDTO) throws URISyntaxException {
        log.debug("REST request to save AlunoDoutorado : {}", alunoDoutoradoDTO);
        if (alunoDoutoradoDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("alunoDoutorado", "idexists", "A new alunoDoutorado cannot already have an ID")).body(null);
        }
        AlunoDoutoradoDTO result = alunoDoutoradoService.save(alunoDoutoradoDTO);
        return ResponseEntity.created(new URI("/api/aluno-doutorados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("alunoDoutorado", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /aluno-doutorados : Updates an existing alunoDoutorado.
     *
     * @param alunoDoutoradoDTO the alunoDoutoradoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated alunoDoutoradoDTO,
     * or with status 400 (Bad Request) if the alunoDoutoradoDTO is not valid,
     * or with status 500 (Internal Server Error) if the alunoDoutoradoDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/aluno-doutorados",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<AlunoDoutoradoDTO> updateAlunoDoutorado(@RequestBody AlunoDoutoradoDTO alunoDoutoradoDTO) throws URISyntaxException {
        log.debug("REST request to update AlunoDoutorado : {}", alunoDoutoradoDTO);
        if (alunoDoutoradoDTO.getId() == null) {
            return createAlunoDoutorado(alunoDoutoradoDTO);
        }
        AlunoDoutoradoDTO result = alunoDoutoradoService.save(alunoDoutoradoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("alunoDoutorado", alunoDoutoradoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /aluno-doutorados : get all the alunoDoutorados.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of alunoDoutorados in body
     */
    @RequestMapping(value = "/aluno-doutorados",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<AlunoDoutoradoDTO> getAllAlunoDoutorados() {
        log.debug("REST request to get all AlunoDoutorados");
        return alunoDoutoradoService.findAll();
    }

    /**
     * GET  /aluno-doutorados/:id : get the "id" alunoDoutorado.
     *
     * @param id the id of the alunoDoutoradoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the alunoDoutoradoDTO, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/aluno-doutorados/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<AlunoDoutoradoDTO> getAlunoDoutorado(@PathVariable Long id) {
        log.debug("REST request to get AlunoDoutorado : {}", id);
        AlunoDoutoradoDTO alunoDoutoradoDTO = alunoDoutoradoService.findOne(id);
        return Optional.ofNullable(alunoDoutoradoDTO)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /aluno-doutorados/:id : delete the "id" alunoDoutorado.
     *
     * @param id the id of the alunoDoutoradoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/aluno-doutorados/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteAlunoDoutorado(@PathVariable Long id) {
        log.debug("REST request to delete AlunoDoutorado : {}", id);
        alunoDoutoradoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("alunoDoutorado", id.toString())).build();
    }

}
