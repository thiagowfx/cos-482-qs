package br.ufrj.cos482.service;

import br.ufrj.cos482.service.dto.DocumentoSistemaDTO;

import java.util.LinkedList;
import java.util.List;

/**
 * Service Interface for managing DocumentoSistema.
 */
public interface DocumentoSistemaService {

    /**
     * Save a documentoSistema.
     *
     * @param documentoSistemaDTO the entity to save
     * @return the persisted entity
     */
    DocumentoSistemaDTO save(DocumentoSistemaDTO documentoSistemaDTO);

    /**
     *  Get all the documentoSistemas.
     *  
     *  @return the list of entities
     */
    List<DocumentoSistemaDTO> findAll();

    /**
     *  Get the "id" documentoSistema.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    DocumentoSistemaDTO findOne(Long id);

    /**
     *  Delete the "id" documentoSistema.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
